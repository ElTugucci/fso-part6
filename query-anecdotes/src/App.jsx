import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, castVote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  const updatedAnecdoteMutation = useMutation({
    mutationFn: castVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data ...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = async (anecdote) => {
    updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

    await dispatch({ type: 'show', payload: `You voted: ${anecdote.content} !` })

    setTimeout(() => {
      dispatch({ type: 'hide' })
    }, 5000)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
