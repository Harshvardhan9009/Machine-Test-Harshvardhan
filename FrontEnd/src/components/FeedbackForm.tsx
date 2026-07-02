import { useState, type FormEvent } from 'react'
import { submitFeedback } from '../api/feedback'
import { CATEGORIES, type Category } from '../constants/categories'
import './FeedbackForm.css'

const MIN_COMMENT_LENGTH = 10

export function FeedbackForm() {
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const trimmedComment = comment.trim()
  const isValid = trimmedComment.length >= MIN_COMMENT_LENGTH

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValid) return

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await submitFeedback({ category, comment: trimmedComment })
      setComment('')
      setCategory(CATEGORIES[0])
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="feedback-card">
      <div className="feedback-card-header">
        <h2>Share your feedback</h2>
        <p>Tell us what is working well and what we can improve.</p>
      </div>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            disabled={loading}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Comments</span>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Describe your experience in detail..."
            rows={6}
            disabled={loading}
          />
          <small className={isValid || trimmedComment.length === 0 ? 'hint' : 'hint error'}>
            {trimmedComment.length}/{MIN_COMMENT_LENGTH} characters minimum
          </small>
        </label>

        {error && (
          <p className="banner error" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="banner success" role="status">
            Thank you! Your feedback has been submitted.
          </p>
        )}

        <button type="submit" className="primary-button" disabled={loading || !isValid}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </section>
  )
}
