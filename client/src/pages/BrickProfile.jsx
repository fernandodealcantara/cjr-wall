import { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import {
  GitHubButton,
  InstagramButton,
  LinkedInButton,
  TwitterButton,
} from '../components/SocialButtons'
import api from '../services/api'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

function BrickProfile() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [markdown, setMarkdown] = useState('')
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  })

  const fetchUserInfo = async () => {
    try {
      const data = await api.data.getUserInfo(userId)

      if (data) {
        const { socialLinks, markdown, ...userInfo } = data
        setUser(userInfo)
        setMarkdown(markdown)
        setSocialLinks(socialLinks)
      } else {
        setMarkdown('')
      }
    } catch (err) {
      console.error(err)
      setUser(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  if (user === null) {
    return <Spinner />
  }

  return user ? (
    <div className="grid grid-cols-1 md:grid-cols-8 m-auto mt-10 mb-2 w-[80%] gap-3">
      <div
        className="shadow-md shadow-gray-900 flex flex-col items-center rounded-[1rem] bg-[#22223b]
                    col-span-1 md:col-span-3 p-5 h-fit gap-1"
      >
        <img className="w-20 h-20 rounded-full" src={user.picture} alt="" />
        <p className="font-medium dark:text-white text-center">{user.name}</p>
        <p className="mt-3">Perfis de redes sociais</p>
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          <InstagramButton href={socialLinks.instagram} target="_blank" />
          <TwitterButton href={socialLinks.twitter} target="_blank" />
          <GitHubButton href={socialLinks.github} target="_blank" />
          <LinkedInButton href={socialLinks.linkedin} target="_blank" />
        </div>
      </div>
      <MDEditor.Markdown
        source={markdown}
        visibleDragbar={false}
        className="shadow-md shadow-gray-900 p-[1.5rem] rounded-[1rem] col-span-1 md:col-span-5 min-h-[40vh] md:min-h-[80vh]
                  h-full  rounded-l-none]"
        height="100%"
        rehypePlugins={[rehypeSanitize]}
      />
    </div>
  ) : (
    <h1>Usuário não encontrado.</h1>
  )
}

export default BrickProfile
