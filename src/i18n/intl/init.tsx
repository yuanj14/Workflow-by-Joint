import React, { useEffect, useState } from 'react'
import intl, { changeCurrentLocale } from 'react-intl-universal'
interface LocaleMessages {
  greeting: string
  welcome: string
  today: string
}

const localeResources: Record<string, LocaleMessages> = {
  'en-US': {
    greeting: 'Hello, {name}!',
    welcome: 'Welcome to our application.',
    today: 'Today is {date, date, long}',
  },
  'zh-CN': {
    greeting: '你好, {name}!',
    welcome: '欢迎使用我们的应用。',
    today: '今天是 {date, date, long}',
  },
}

const App: React.FC = () => {
  const [initDone, setInitDone] = useState(false)
  const [currentLang, setCurrentLang] = useState('en-US')

  useEffect(() => {
    const initIntl = async () => {
      const userLocale = navigator.language
      console.log('Browser locale detected:', userLocale)
      await intl.init({
        currentLocale: userLocale,
        locales: localeResources,
        fallbackLocale: 'en-US',
      })
      setInitDone(true)
      setCurrentLang(userLocale)
    }
    initIntl()
  }, [])
  //第一次
  if (!initDone) {
    console.log('awting')
    return <div>Loading translations...</div>
  }
  const handleChangeLang = () => {
    const newLang = currentLang === 'en-US' ? 'zh-CN' : 'en-US'
    changeCurrentLocale(newLang)
    setCurrentLang(newLang)
  }

  return (
    <div>
      <h1>{intl.get('greeting', { name: 'TypeScript' })}</h1>
      <p>{intl.get('welcome')}</p>
      <p>{intl.get('today', { date: new Date() })}</p>
      <button onClick={handleChangeLang}>
        {currentLang === 'en-US' ? 'Switch to Chinese' : '切换为英文'}
      </button>
    </div>
  )
}

export default App
