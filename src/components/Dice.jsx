export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59e391' : 'white'
    }
    return (
        <button
            style={styles}
            onClick={props.hold}
        >{props.value}</button>
    )
}