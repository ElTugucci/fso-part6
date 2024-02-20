import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newNoteMutation.mutate({ content, votes: 0 })
  }

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: async () => {
      await dispatch({ type: 'show', payload: `too short anecdote, must have length 5 or more` })
      setTimeout(() => {
        dispatch({ type: 'hide' })
      }, 5000)
    }
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
