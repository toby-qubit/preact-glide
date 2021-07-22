const Glide = require('@glidejs/glide').default
const React = require('preact')
const { useState, useEffect } = require('preact/hooks')

const Carousel = ({
  element = 'glide',
  glideOptions,
  glideComponents,
  glideEvents,
  controls = false,
  arrows = false,
  bullets = false,
  children
}) => {
  const [slider] = useState(new Glide(`.${element}`, glideOptions))

  useEffect(() => {
    glideEvents && glideEvents.length && glideEvents.map(({ event, cb }) => slider.on(event, cb))

    slider.mount(glideComponents)

    return () => slider.destroy()
  }, [])

  const Arrows = () => {
	return (
	  <div className={`${element}__arrows`} data-glide-el='controls'>
		<button
		  className={`${element}__arrow ${element}__arrow--left`}
		  data-glide-dir='<'
		>
		  prev
		</button>
		<button
		  className={`${element}__arrow ${element}__arrow--right`}
		  data-glide-dir='>'
		>
		  next
		</button>
	  </div>
	)
  }

  const Bullets = () => {
	  return (
		<div className={`${element}__bullets`} data-glide-el="controls[nav]">
			{children.map((slide, index) => (<button className={`${element}__bullet`} data-glide-dir={`=${index}`}></button>))}
		</div>
	  )
  }
  
  const Controls = () => {
	return (
	  <div data-glide-el='controls'>
		<button data-glide-dir='<<'>Start</button>
		<button data-glide-dir='>>'>End</button>
	  </div>
	)
  }

  return (
    <div className={element}>
      <div className={`${element}__track`} data-glide-el='track'>
        <ul className={`${element}__slides`}>
          {children.map((slide, index) => {
            return React.cloneElement(slide, {
              ...slide.props,
              key: index,
              className: `${
                slide.props.className ? slide.props.className : ''
              } ${element}__slide`
            })
          })}
        </ul>
      </div>
      {arrows ? <Arrows /> : ''}
	  {bullets ? <Bullets /> : ''}
      {controls ? <Controls /> : ''}
    </div>
  )
}

module.exports = Carousel
