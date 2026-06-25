import { useState } from 'react'
import '../styles/shared.css'

export default function FormsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [country, setCountry] = useState('')
  const [plan, setPlan] = useState('free')
  const [skills, setSkills] = useState<string[]>([])
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page" data-testid="forms-page">
      <header className="page-header">
        <h1>Form Controls</h1>
        <p>Các loại input phổ biến để luyện Playwright form interaction</p>
      </header>

      <div className="card">
        <form onSubmit={handleSubmit} data-testid="registration-form">
          <div className="card-title">Đăng ký thông tin</div>

          <div className="form-group">
            <label htmlFor="full-name">Họ và tên</label>
            <input
              id="full-name"
              type="text"
              className="input"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="full-name-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Giới thiệu</label>
            <textarea
              id="bio"
              className="textarea"
              placeholder="Viết vài dòng về bản thân..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              data-testid="bio-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Quốc gia</label>
            <select
              id="country"
              className="select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              data-testid="country-select"
            >
              <option value="">-- Chọn quốc gia --</option>
              <option value="vn">Việt Nam</option>
              <option value="us">Hoa Kỳ</option>
              <option value="jp">Nhật Bản</option>
              <option value="kr">Hàn Quốc</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="birthdate">Ngày sinh</label>
            <input
              id="birthdate"
              type="date"
              className="input"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              data-testid="birthdate-input"
            />
          </div>

          <div className="divider" />

          <div className="form-group">
            <label>Kỹ năng (checkbox)</label>
            <div className="checkbox-group" data-testid="skills-group">
              {['JavaScript', 'TypeScript', 'Python', 'Playwright'].map((skill) => (
                <label key={skill} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    data-testid={`skill-${skill.toLowerCase()}`}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Giới tính (radio)</label>
            <div className="radio-group" data-testid="gender-group">
              {['Nam', 'Nữ', 'Khác'].map((g) => (
                <label key={g} className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={() => setGender(g)}
                    data-testid={`gender-${g.toLowerCase()}`}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Gói dịch vụ</label>
            <div className="radio-group" data-testid="plan-group">
              {[
                { value: 'free', label: 'Miễn phí' },
                { value: 'pro', label: 'Pro' },
                { value: 'enterprise', label: 'Enterprise' },
              ].map((p) => (
                <label key={p.value} className="radio-label">
                  <input
                    type="radio"
                    name="plan"
                    value={p.value}
                    checked={plan === p.value}
                    onChange={() => setPlan(p.value)}
                    data-testid={`plan-${p.value}`}
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" data-testid="form-submit">
            Gửi form
          </button>

          {submitted && (
            <div
              className="success-msg"
              data-testid="form-success"
              role="status"
              style={{ marginTop: '1rem' }}
            >
              Đã gửi form thành công! Tên: {name || '(trống)'}, Email: {email || '(trống)'}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
