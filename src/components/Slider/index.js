import Inferno from 'inferno'
import Component from 'inferno-component'
import { clamp } from 'ramda'
import classNames from './Slider.css'

class Slider extends Component {
  constructor(...args) {
    super(...args)

    this.state = { mouseDownStartTime: 0 }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleMouseDown({ timeStamp }) {
    this.setState({ mouseDownStartTime: timeStamp })

    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove(event) {
    const { orient, value } = this.props
    const vert = orient === 'vertical'
    const movement = vert ? event.movementY : event.movementX
    const dim = vert
      ? this.barContainer.offsetHeight
      : this.barContainer.offsetWidth

    this.props.onChange(clamp(0, 1, movement / -dim + value))
  }

  handleMouseUp(event) {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)

    const movement =
      this.props.orient === 'vertical' ? event.movementY : event.movementX
    const clickTime = event.timeStamp - this.state.mouseDownStartTime < 300
    const clickMove = movement < 4

    if (clickTime && clickMove) this.registerClick(event)
  }

  registerClick(event) {
    const { orient } = this.props
    const vert = orient === 'vertical'
    const offset = vert ? event.offsetY : event.offsetX
    const dim = vert
      ? this.barContainer.offsetHeight
      : this.barContainer.offsetWidth

    this.props.onChange(clamp(0, 1, 1 - offset / dim))
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const { orient, value, renderLabel, renderValue } = this.props
    const isVert = orient === 'vertical'
    const offVal = `${(1 - value) * 100}%`

    return (
      <div
        className={isVert ? classNames.rootVertical : classNames.rootHorizontal}
      >
        <div className={classNames.label}>{renderLabel()}</div>
        <div
          className={classNames.barContainer}
          onMouseDown={this.handleMouseDown}
          ref={c => {
            this.barContainer = c
          }}
        >
          <div className={classNames.track} />
          <div
            className={classNames.bar}
            style={isVert ? { top: offVal } : { right: offVal }}
          />
        </div>
        <div className={classNames.value}>{renderValue()}</div>
      </div>
    )
  }
}

Slider.defaultProps = {
  orient: 'vertical',
  onSlide: () => {},
}

export default Slider
