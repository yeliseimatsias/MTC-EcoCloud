const Task = (props) =>
{
    return (
        <li key={props.Id} className="task-item">
            <span className="task-item__title">{props.children}</span>
            <span className="task-item__points">+ {props.Points} эко</span>
        </li>
    )
}

export default Task