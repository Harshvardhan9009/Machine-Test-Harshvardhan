import type { Feedback } from '../types/feedback'
import './FeedbackTable.css'

interface FeedbackTableProps {
  feedback: Feedback[]
  loading: boolean
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function FeedbackTable({ feedback, loading }: FeedbackTableProps) {
  return (
    <section className="panel feedback-table-panel">
      <div className="panel-header">
        <h2>Recent submissions</h2>
        <p>Latest feedback from users</p>
      </div>

      {loading ? (
        <p className="empty-state">Loading submissions...</p>
      ) : feedback.length === 0 ? (
        <p className="empty-state">No submissions match your filters.</p>
      ) : (
        <div className="table-wrap">
          <table className="feedback-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                <th scope="col">Comment</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <span className="category-pill">{item.category}</span>
                  </td>
                  <td>{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
