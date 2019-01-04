import React, { Component, useState, useEffect, useReducer, useRef, useLayoutEffect, useCallback } from 'react';
import { render } from 'react-dom';

function Example1() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<h1>Example1: function-useState</h1>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)} >
				点我
			</button>
		</div>
	);
}

// 等同于
class Example11 extends Component {
	state = {
		count: 0,
	}

	render() {
		const { count } = this.state;
		return (
			<div>
				<h1>Example1: class-state</h1>
				<p>You clicked {count} times</p>
				<button onClick={() => this.setState({ count: count + 1 })} >
					点我
				</button>
			</div>
		)
	}
}
// 等同于
const Example12 = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<h1>Example12: function-component-useState</h1>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)} >
				点我
			</button>
		</div>
	);
}

function Example2() {
	const [count, setCount] = useState(0);
	const [date, setDate] = useState(() => {
		let date = new Date().valueOf();
		date = date - (date % 86400000 + 3600000 * 8)
		return new Date(date).toString();
	})

	return (
		<div>
			<h1>Example2: useState-functional-updates</h1>
			<p>Count: {count}</p>
			<button onClick={() => setCount(0)}>Reset</button>&nbsp;&nbsp;
			<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>&nbsp;&nbsp;
			<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
			<p>Date: {date}</p>
		</div>
	);
}

function Example3() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `You clicked ${count} time`;
	});

	return (
		<div>
			<h1>Example3: useEffect</h1>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)} >
				点我
			</button>
		</div>
	);
}

const initialState = { count: 0 };

function reducer(state, action) {
	switch (action.type) {
		case 'reset':
			return initialState;
		case 'increment':
			return { count: state.count + 1 };
		case 'decrement':
			return { count: state.count - 1 };
		default:
			return state;
	}
}

function Example4({ initialCount } = {}) {
	const [state, dispatch] = useReducer(reducer, { count: initialCount });
	// lazy initialization, 第三个参数是initialAction
	// const [state, dispatch] = useReducer(
	// 	reducer, initialState, { type: 'reset', payload: initialCount },
	// );
	return (
		<div>
			<h1>Example4: useReducer</h1>
			<p>Count: {state.count}</p>
			<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>&nbsp;&nbsp;
			<button onClick={() => dispatch({ type: 'increment' })}>+</button>&nbsp;&nbsp;
			<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
		</div>
	)
}

function Example5() {
	const inputEl = useRef(null);
	const onButtonClick = () => {
		// `current` points to the mounted text input element
		inputEl.current.focus();
	};
	return (
		<div>
			<h1>Example5: useRef</h1>
			<input ref={inputEl} type="text" />
			<button onClick={onButtonClick}>Focus the input</button>
		</div>
	)
}

function Example6() {
	const [text, updateText] = useState('');
	const textRef = useRef();

	useLayoutEffect(() => {
		textRef.current = text; // Write it to the ref
	});

	const handleSubmit = useCallback(() => {
		const currentText = textRef.current; // Read it from the ref
		alert(currentText);
	}, [textRef]); // Don't recreate handleSubmit like [text] would do

	return (
		<div>
			<h1>Example6: useLayoutEffect</h1>
			<input value={text} onChange={e => updateText(e.target.value)} />&nbsp;&nbsp;
			<button onClick={handleSubmit} >点击提交</button>
		</div>
	);
}

function useEventCallback(fn, dependencies) {
	const ref = useRef(() => {
		throw new Error('Cannot call an event handler while rendering.');
	});

	useLayoutEffect(() => {
		ref.current = fn;
	}, [fn, ...dependencies]);

	return useCallback(() => {
		const fn = ref.current;
		return fn();
	}, [ref]);
}

function Example7() {
	const [text, updateText] = useState('');
	// Will be memoized even if `text` changes:
	const handleSubmit = useEventCallback(() => {
		alert(text);
	}, [text]);

	return (
		<div>
			<h1>Example7: custom hook</h1>
			<input value={text} onChange={e => updateText(e.target.value)} />&nbsp;&nbsp;
			<button onClick={handleSubmit} >点击提交</button>
		</div>
	);
}

const App = () => (
	<div>
		<Example1 />
		<Example11 />
		<Example12 />
		<Example2 />
		<Example3 />
		<Example4 initialCount={10} />
		<Example5 />
		<Example6 />
		<Example7 />
	</div>
);

render(<App />, document.getElementById('app'));