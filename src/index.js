import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './index.css';
import logo from './logo.png';
import joji from './joji.mp3'
import anime from 'animejs/lib/anime.es.js';


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
        this.setState({
            start: true,
        });
    }

    handleOnPause() {
        this.setState({
            start: false,
        });
    }

    render() {
        if (this.start === true) {
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
        }else {
            return(
                <div>:)</div>
            )
        }
    }
}

class Player extends React.Component {  // temp to just show components
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
                            onPlay={e => EmojiController.handleOnPlay}
                            onPause={e => EmojiController.handleOnPause}
                        />
                        <div className="emoji-stream">
                            <EmojiController 
                                start={false}
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