import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './index.css';
import logo from './logo.png';
import joji from './joji.mp3'


function Pizza() {
    return <img src={logo} alt="Logo" className="pizza"/>
}

function EmojiLabel() {
    return <label>
        Emoji filler
    </label>
}

const AudioPlayerBrains = () => (
    <AudioPlayer
      autoPlay
      src="http://example.com/audio.mp3"
      onPlay={e => console.log("onPlay")}
      // other props here
    />
);

const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);

class Player extends React.Component {  // temp to just show components
    render() {
        return (
            <div>
                <div>
                    <Pizza />
                </div>

                <div className="flex-container">
                    <div className="emoji">
                        <h1 className="emoji-text"><Emoji symbol="🐑"/></h1>
                    </div>

                    <div className="progress-bar-div">
                        <AudioPlayer 
                            style={{width:'500px' }}
                            src={joji} 
                        />
                    </div>
                </div>

            </div>
        );
    }
}

// ==============================================


ReactDOM.render(
    <Player />,
    document.getElementById('root')
);