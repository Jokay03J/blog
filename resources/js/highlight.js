import showdown from 'showdown'
import sanitizeHtml from 'sanitize-html'

const btnPreview = document.getElementById('btn-preview')
const preview = document.getElementById('preview')
const area = document.getElementById('area')

btnPreview.addEventListener('click', () => {
  const converter = new showdown.Converter()
  const html = converter.makeHtml(area.value)
  const sanitizedHtml = sanitizeHtml(html)
  preview.innerHTML = sanitizedHtml
  preview.classList.toggle('d--none')
  area.classList.toggle('d--none')
})
