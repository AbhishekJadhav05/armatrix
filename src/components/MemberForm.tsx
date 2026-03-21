"use client";

import { useState, useCallback } from "react";
import { ALL_DEPARTMENTS, Department } from "_enums/department";
import { skillsFromString } from "_utils/format";
import { avatarUrl } from "_utils/avatar";
import type { TeamMemberCreate } from "_types/team";
import Image from "next/image";

type FormMode = "add" | "edit";

interface MemberFormProps {
  mode: FormMode;
  initial?: Partial<TeamMemberCreate>;
  onSubmit: (data: TeamMemberCreate) => Promise<void>;
  onCancel: () => void;
}

interface FormErrors {
  name?: string;
  role?: string;
  department?: string;
  bio?: string;
  joined_date?: string;
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: "4px",
  display: "block",
  letterSpacing: "0.1em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-primary)",
  border: "1px solid var(--bg-border)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  padding: "8px 10px",
  outline: "none",
  transition: "border-color 0.2s",
};

export default function MemberForm({
  mode,
  initial,
  onSubmit,
  onCancel,
}: MemberFormProps): JSX.Element {
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [department, setDepartment] = useState(
    initial?.department ?? Department.Engineering
  );
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photo_url ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(initial?.linkedin_url ?? "");
  const [githubUrl, setGithubUrl] = useState(initial?.github_url ?? "");
  const [isFounder, setIsFounder] = useState(initial?.is_founder ?? false);
  const [joinedDate, setJoinedDate] = useState(initial?.joined_date ?? "");
  const [skillsStr, setSkillsStr] = useState(
    initial?.skills?.join(", ") ?? ""
  );
  const [funFact, setFunFact] = useState(initial?.fun_fact ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!role.trim()) e.role = "Role is required";
    if (!ALL_DEPARTMENTS.includes(department as Department))
      e.department = "Invalid department";
    if (!bio.trim()) e.bio = "Bio is required";
    if (bio.length > 400) e.bio = "Bio must be 400 characters or fewer";
    if (!/^\d{4}-\d{2}$/.test(joinedDate))
      e.joined_date = "Must be YYYY-MM format";
    return e;
  }, [name, role, department, bio, joinedDate]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        role: role.trim(),
        department: department as Department,
        bio: bio.trim(),
        photo_url: photoUrl || avatarUrl(name),
        linkedin_url: linkedinUrl || null,
        github_url: githubUrl || null,
        is_founder: isFounder,
        joined_date: joinedDate,
        skills: skillsFromString(skillsStr),
        fun_fact: funFact || null,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const errorStyle: React.CSSProperties = {
    color: "#FF4747",
    fontSize: "11px",
    fontFamily: "var(--font-mono)",
    marginTop: "2px",
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      {/* Name */}
      <div>
        <label style={labelStyle}>Name *</label>
        <input
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
        {errors.name && <div style={errorStyle}>{errors.name}</div>}
      </div>

      {/* Role */}
      <div>
        <label style={labelStyle}>Role *</label>
        <input
          style={inputStyle}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
        {errors.role && <div style={errorStyle}>{errors.role}</div>}
      </div>

      {/* Department */}
      <div>
        <label style={labelStyle}>Department *</label>
        <select
          style={{ ...inputStyle, cursor: "pointer" }}
          value={department}
          onChange={(e) => setDepartment(e.target.value as Department)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        >
          {ALL_DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.department && <div style={errorStyle}>{errors.department}</div>}
      </div>

      {/* Bio */}
      <div>
        <label style={labelStyle}>Bio * ({bio.length}/400)</label>
        <textarea
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: "80px",
            fontFamily: "var(--font-body)",
          }}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
        {errors.bio && <div style={errorStyle}>{errors.bio}</div>}
      </div>

      {/* Photo URL + preview */}
      <div>
        <label style={labelStyle}>Photo URL</label>
        <input
          style={inputStyle}
          type="url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
        <div
          style={{
            marginTop: "8px",
            width: "48px",
            height: "48px",
            position: "relative",
            border: "1px solid var(--bg-border)",
          }}
        >
          <Image
            src={photoUrl || avatarUrl(name || "?")}
            alt="preview"
            width={48}
            height={48}
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>
      </div>

      {/* LinkedIn */}
      <div>
        <label style={labelStyle}>LinkedIn URL</label>
        <input style={inputStyle} type="url" value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
      </div>

      {/* GitHub */}
      <div>
        <label style={labelStyle}>GitHub URL</label>
        <input style={inputStyle} type="url" value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
      </div>

      {/* Founder */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={isFounder}
          onChange={(e) => setIsFounder(e.target.checked)}
          id="is-founder"
          style={{ accentColor: "var(--accent)" }}
        />
        <label htmlFor="is-founder" style={labelStyle}>
          Founder
        </label>
      </div>

      {/* Joined date */}
      <div>
        <label style={labelStyle}>Joined Date *</label>
        <input
          style={inputStyle}
          placeholder="YYYY-MM"
          value={joinedDate}
          onChange={(e) => setJoinedDate(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
        {errors.joined_date && (
          <div style={errorStyle}>{errors.joined_date}</div>
        )}
      </div>

      {/* Skills */}
      <div>
        <label style={labelStyle}>Skills</label>
        <input
          style={inputStyle}
          placeholder="ROS2, C++, Python"
          value={skillsStr}
          onChange={(e) => setSkillsStr(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
      </div>

      {/* Fun fact */}
      <div>
        <label style={labelStyle}>Fun Fact</label>
        <input style={inputStyle} value={funFact}
          onChange={(e) => setFunFact(e.target.value)}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bg-border)"; }}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            flex: 1,
            background: "var(--accent)",
            color: "var(--bg-primary)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "14px",
            border: "none",
            padding: "12px",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {submitting
            ? "Saving..."
            : mode === "add"
            ? "Add Member"
            : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "transparent",
            border: "1px solid var(--bg-border)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            textTransform: "uppercase",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
