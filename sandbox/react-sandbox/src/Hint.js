import './Hint.css';

function Hint(props) {
    return (
        <div id="hint" className="hint">
            <div className="hint__title">{props.title}</div>
            <div className="hint__content">{props.content}</div>
            <div className="hint__controls">
                <button onClick={props.goPrevious} className="hint__btn">
                    prev
                </button>
                <button onClick={props.goNext} className="hint__btn">
                    next
                </button>
                <button
                    v-if="lastHintId"
                    onClick={props.goNext}
                    className="hint__btn"
                >
                    last
                </button>
            </div>
            <span onClick={props.stop} className="hint__close">
                x
            </span>
        </div>
    );
}

export default Hint;
