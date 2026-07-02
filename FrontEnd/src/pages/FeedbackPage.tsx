import { FeedbackForm } from '../components/FeedbackForm'
import './FeedbackPage.css'

export function FeedbackPage() {
  return (
    <div className="feedback-page">
      <section className="page-intro">
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
