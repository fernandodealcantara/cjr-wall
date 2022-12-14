import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import MDEditor, { commands } from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import {
  GitHubSvg,
  InstagramSvg,
  LinkedInSvg,
  TwitterSvg,
} from '../components/SocialButtons'
import UrlInput from '../components/UrlInput'
import api from '../services/api'
import DepartmentsRadioInput from '../components/DepartmentsRadioInput'

function Profile() {
  const { user } = useAuth()
  const [markdown, setMarkdown] = useState('')
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  })
  const [department, setDepartment] = useState('')

  const handleSave = async () => {
    try {
      const data = await api.saveProfile({
        department,
        content: markdown,
        github: socialLinks.github,
        instagram: socialLinks.instagram,
        linkedin: socialLinks.linkedin,
        twitter: socialLinks.twitter,
      })

      setMarkdown(data.content)
      setSocialLinks({
        github: data.github,
        instagram: data.instagram,
        linkedin: data.linkedin,
        twitter: data.twitter,
      })
      setDepartment(data.department)
      alert('Perfil salvo com sucesso.')
    } catch (error) {
      console.error(error)
      alert('Erro ao salvar perfil, tente novamente mais tarde.')
    }
  }

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value)
  }

  const handleSocialLinkChange = (event) => {
    setSocialLinks({ ...socialLinks, [event.target.name]: event.target.value })
  }

  const handleMarkdownChange = (data, _viewUpdate) => {
    setMarkdown(data)
  }

  const fetchUserInfo = async () => {
    try {
      const data = await api.getProfile(user.id)
      const { github, instagram, linkedin, twitter, content, department } = data

      setDepartment(department)
      setMarkdown(content)
      setSocialLinks({ github, instagram, linkedin, twitter })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 m-auto mt-10 mb-2 w-[80%] gap-3">
      <div
        className="shadow-md shadow-gray-900 flex flex-col items-center rounded-[1rem] bg-[#22223b]
        col-span-1 md:col-span-3 p-5 h-fit gap-1"
      >
        <img className="w-20 h-20 rounded-full" src={user.picture} alt="" />
        <p className="font-medium dark:text-white text-center mb-4">
          {user.name}
        </p>
        <DepartmentsRadioInput
          onChange={handleDepartmentChange}
          value={department}
        />
        <p className="my-1">Perfis de redes sociais</p>
        <UrlInput
          name="instagram"
          labelText="Instagram"
          placeholder="instagram.com/usuario"
          Icon={InstagramSvg}
          onChange={handleSocialLinkChange}
          value={socialLinks.instagram}
        />
        <UrlInput
          name="twitter"
          labelText="Twitter"
          placeholder="twitter.com/usuario"
          Icon={TwitterSvg}
          onChange={handleSocialLinkChange}
          value={socialLinks.twitter}
        />
        <UrlInput
          name="github"
          labelText="GitHub"
          placeholder="github.com/usuario"
          Icon={GitHubSvg}
          onChange={handleSocialLinkChange}
          value={socialLinks.github}
        />
        <UrlInput
          name="linkedin"
          labelText="LinkedIn"
          placeholder="linkedin.com/in/usuario"
          Icon={LinkedInSvg}
          onChange={handleSocialLinkChange}
          value={socialLinks.linkedin}
        />
        <button
          type="button"
          className="inline-block mt-2 px-6 py-2.5 bg-green-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
      <MDEditor
        value={markdown}
        onChange={handleMarkdownChange}
        visibleDragbar={false}
        extraCommands={[commands.codeEdit, commands.codePreview]}
        autoFocus
        preview="edit"
        className="col-span-1 md:col-span-5 min-h-[40vh] md:min-h-[80vh]
                  h-full  rounded-l-none]"
        height="100%"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  )
}

export default Profile
