import { useState } from 'react'
import './lib/supabase'
import './App.css'

const seasons = {
  spring: {
    icon: '🌸',
    label: 'Spring',
    message: 'Something lovely is blooming.'
  },
  summer: {
    icon: '☀️',
    label: 'Summer',
    message: 'A little sunshine, just us two.'
  },
  fall: {
    icon: '🍂',
    label: 'Fall',
    message: 'Let’s make a cozy little memory.'
  },
  winter: {
    icon: '❄️',
    label: 'Winter',
    message: 'You’re my favorite reason to stay warm.'
  }
}

function getSeason(month) {
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

function getToday() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

const noMessages = [
  'No 🙈',
  'Are you sure? 🥺',
  'Pretty please? 💐',
  'Maybe later'
]
const encouragements = [
  '',
  'I promise good food and excellent company.',
  'The excellent company is me, obviously.',
  'No pressure. Your invitation will be right here 💛'
]

function App() {
  const [step, setStep] = useState('invitation')
  const [themeChoice, setThemeChoice] = useState('auto')
  const [noCount, setNoCount] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('18:30')
  const [duration, setDuration] = useState('120')

  const month = date ? Number(date.split('-')[1]) - 1 : new Date().getMonth()
  const season = themeChoice === 'auto' ? getSeason(month) : themeChoice
  const theme = seasons[season]

  return (
    <main className={`date-app theme-${season}`}>
      <header className='top-bar'>
        <span className='brand'>date with me ♡</span>
        <label className='theme-picker'>
          Theme
          <select
            value={themeChoice}
            onChange={(event) => setThemeChoice(event.target.value)}
          >
            <option value='auto'>Seasonal</option>
            {Object.entries(seasons).map(([value, item]) => (
              <option key={value} value={value}>
                {item.icon} {item.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className='invitation-card' aria-labelledby='page-title'>
        <div className='season-icon' aria-hidden='true'>
          {theme.icon}
        </div>

        {step === 'invitation' ? (
          <>
            <p className='eyebrow'>A LITTLE INVITATION FOR YOU</p>
            <h1 id='page-title'>Will you go on a date with me?</h1>
            <p className='subtitle'>
              {theme.message} You pick the when and where. I’ll bring the
              butterflies.
            </p>

            <div className='button-row'>
              <button
                className='button primary'
                style={{ fontSize: `${1 + noCount * 0.08}rem` }}
                onClick={() => setStep('when')}
              >
                Yes, let’s go 💕
              </button>
              <button
                className='button secondary'
                onClick={() => setNoCount((count) => Math.min(count + 1, 3))}
              >
                {noMessages[noCount]}
              </button>
            </div>

            <p className='playful-message' aria-live='polite'>
              {encouragements[noCount]}
            </p>
          </>
        ) : step === 'when' ? (
          <>
            <p className='eyebrow'>STEP 1 OF 4 · WHEN</p>
            <h1 id='page-title'>It’s a date. When are you free?</h1>
            <p className='subtitle'>Pick a little time for just us.</p>

            <form
              className='date-form'
              onSubmit={(event) => {
                event.preventDefault()
                setStep('preview')
              }}
            >
              <label>
                Date
                <input
                  type='date'
                  required
                  min={getToday()}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </label>

              <label>
                Start time
                <input
                  type='time'
                  required
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </label>

              <label className='full-width'>
                How much time shall we spend together?
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                >
                  <option value='60'>1 hour</option>
                  <option value='90'>1½ hours</option>
                  <option value='120'>2 hours</option>
                  <option value='180'>3 hours</option>
                </select>
              </label>

              <div className='button-row full-width'>
                <button
                  type='button'
                  className='button secondary'
                  onClick={() => setStep('invitation')}
                >
                  Back
                </button>
                <button type='submit' className='button primary'>
                  Continue →
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className='eyebrow'>DATE & TIME SELECTED</p>
            <h1 id='page-title'>A little time for us ♡</h1>
            <p className='subtitle'>
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: 'full',
                timeStyle: 'short'
              }).format(new Date(`${date}T${time}`))}
            </p>
            <p className='subtitle'>{Number(duration) / 60} hours together</p>
            <p className='preview-note'>
              Next up: choosing a cuisine. This step is coming next. Your
              selections haven’t been saved online yet.
            </p>
            <button
              className='button secondary'
              onClick={() => setStep('when')}
            >
              Edit date & time
            </button>
          </>
        )}
      </section>

      <footer>Good food. Your favorite person. A little adventure.</footer>
    </main>
  )
}

export default App
