import { FeedbackForm } from '../components/FeedbackForm'
import { FeedbackMascot } from '../components/FeedbackMascot'
import './FeedbackPage.css'

export function FeedbackPage() {
  return (
    <div className="feedback-page">
      <FeedbackMascot />
      <section className="page-intro">
        <div className="ai-badge">
          <span className="ai-badge-dot" />
          Acowale Engine v1.0
        </div>
        <h2>We value your voice</h2>
        <p>
          Help us improve Acowale products by sharing bugs, ideas, or general
          feedback. Your submission goes directly to our product team.
        </p>
      </section>

      <FeedbackForm />
    </div>
  )
}
