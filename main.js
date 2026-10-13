//import './style.css'

/* ============================================
   VALDO FEST — Page Interactions
   Pure vanilla JavaScript
   ============================================ */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar')

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}, { passive: true })

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')

function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open')
  navToggle.classList.toggle('active', isOpen)
  navToggle.setAttribute('aria-expanded', isOpen)
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu')
}

navToggle.addEventListener('click', toggleMenu)

const navClose = document.getElementById('navClose')
if (navClose) {
  navClose.addEventListener('click', toggleMenu)
}

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      toggleMenu()
    }
  })
})

/* ---------- Scroll reveal animations ---------- */
const revealElements = document.querySelectorAll('[data-reveal]')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0
        setTimeout(() => {
          entry.target.classList.add('revealed')
        }, Number(delay))
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
)

revealElements.forEach((el) => revealObserver.observe(el))

/* ---------- Gallery lightbox ---------- */
const galleryItems = document.querySelectorAll('.gallery-item')
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')
const lightboxCaption = document.getElementById('lightboxCaption')
const lightboxClose = document.getElementById('lightboxClose')
const lightboxPrev = document.getElementById('lightboxPrev')
const lightboxNext = document.getElementById('lightboxNext')

const galleryImages = []
let currentIndex = 0

galleryItems.forEach((item, index) => {
  const img = item.querySelector('img')
  const caption = item.querySelector('figcaption span')
  if (img) {
    galleryImages.push({
      src: img.src,
      alt: img.alt,
      caption: caption ? caption.textContent : '',
    })
  }
  item.addEventListener('click', () => openLightbox(index))
})

function openLightbox(index) {
  currentIndex = index
  updateLightbox()
  lightbox.classList.add('open')
  lightbox.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.classList.remove('open')
  lightbox.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
}

function updateLightbox() {
  const item = galleryImages[currentIndex]
  if (!item) return
  lightboxImg.src = item.src
  lightboxImg.alt = item.alt
  lightboxCaption.textContent = item.caption
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
  updateLightbox()
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length
  updateLightbox()
}

lightboxClose.addEventListener('click', closeLightbox)
lightboxPrev.addEventListener('click', showPrev)
lightboxNext.addEventListener('click', showNext)

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox()
})

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') showPrev()
  if (e.key === 'ArrowRight') showNext()
})

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year')
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}
