import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './index.css';
import logo from './logo.png';
import joji from './joji.mp3'
import anime from 'animejs/lib/anime.es.js';
import { render } from '@testing-library/react';


var playClicked = false;
var emoji_array = [
    "😢",
    "😪",
    "😞",
    "💧",
    "😕"
]

function Pizza() {
    return <img src={logo} alt="Logo" className="pizza"/>
}

function LiveEmoji() {
    const animationRef = React.useRef(null);
            React.useEffect(() => {
                animationRef.current = anime({
                targets: ".animated-emoji",
                translateX: 500,
                duration: 2000,
                direction: "normal",
                easing: "linear"
                });
            }, []);
        return(
            <div>
                <h1 className="animated-emoji"><Emoji symbol={PickRandomEmoji()}/></h1>
                <h1 className="animated-emoji"><Emoji symbol={PickRandomEmoji()}/></h1>
                <h1 className="animated-emoji"><Emoji symbol={PickRandomEmoji()}/></h1>
            </div>
        );
}

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

function PickRandomEmoji() {
    var ind = Math.floor(Math.random() * emoji_array.length);
    return(
        emoji_array[ind]
    );
}

class EmojiController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
        };
    }

    handleOnPlay() {
        this.state.start = true;
    }

    handleOnPause() {
        this.state.start = false;
    }

    render() {
        if (this.state.start === true) {
            return(
                <LiveEmoji />
            );
        }else {
            return(
                <div>:)</div>
            )
        }
    }
}

class Player extends React.Component {  // temp to just show components
    constructor(props) {
        super(props);
        this.emoji_controller = {
            controller: <EmojiController start={false}/>,
        };
    }

    handleOnPlay() {
        this.setState({
            controller: <EmojiController start={true} />
        });
    }

    handleOnPause() {
        this.setState({
            controller: <EmojiController start={false} />
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Pizza />
                </div>

                <div className="flex-container">
                    <div className="emoji">
                        <h1 className="emoji-text"><Emoji symbol="😢"/></h1>
                    </div>

                    <div className="progress-bar-div">
                        <AudioPlayer 
                            style={{width:'500px' }}
                            src={joji}
                            onPlay={e => this.emoji_controller.controller.handleOnPlay}
                            onPause={e => this.emoji_controller.controller.handleOnPause}
                        />
                        <div className="emoji-stream">
                            {/* <EmojiController 
                                start={false}
                            /> */}
                            <EmojiController
                                start={false}
                                handleOnPlay={this.handleOnPlay}
                            />
                        </div>
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