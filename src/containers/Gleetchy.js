import Inferno from 'inferno'
import Component from 'inferno-component'
import { tryCatch } from 'ramda'
import { warn, loadAudioToBuffer } from '../util'
import PlayPauseButton from '../components/PlayPauseButton'
import AudioLooper from '../components/AudioLooper'

const Panel = ({ children, style }) => (
  <div style={{ padding: '10px', margin: '10px', ...style }}>{children}</div>
)

class Gleetchy extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      isPlaying: false,
    }

    const context = new AudioContext()
    const out = context.destination

    this.handlePlayPause = this.handlePlayPause.bind(this)
    this.loadAudioToBuffer = loadAudioToBuffer(context)
    this.connectOut = tryCatch(node => node.connect(out), warn)
    this.disconnectOut = tryCatch(node => node.disconnect(out), warn)
    this.createBufferSourceNode = tryCatch(
      () => context.createBufferSource(),
      warn,
    )
    this.createGainNode = tryCatch(() => context.createGain(), warn)
  }

  handlePlayPause() {
    this.setState(state => ({ isPlaying: !state.isPlaying }))
  }

  render() {
    return (
      <div>
        <Panel>
          <PlayPauseButton
            isPlaying={this.state.isPlaying}
            onClick={this.handlePlayPause}
          />
        </Panel>
        <Panel style={{ borderTop: '1px solid #fee' }}>
          <AudioLooper
            gain={0.6}
            loopEnd={0.25}
            createBufferSourceNode={this.createBufferSourceNode}
            createGainNode={this.createGainNode}
            loadAudio={() => this.loadAudioToBuffer('media/okthenalright4.mp3')}
            connect={this.connectOut}
            disconnect={this.disconnectOut}
            isPlaying={this.state.isPlaying}
          />
        </Panel>
        <Panel>
          <AudioLooper
            gain={0.16}
            loopStart={0.95}
            loopEnd={0.98}
            createBufferSourceNode={this.createBufferSourceNode}
            createGainNode={this.createGainNode}
            loadAudio={() => this.loadAudioToBuffer('media/fmloop.mp3')}
            connect={this.connectOut}
            disconnect={this.disconnectOut}
            isPlaying={this.state.isPlaying}
          />
        </Panel>
      </div>
    )
  }
}

export default Gleetchy
