const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="task-list">
      <h3>Recommended Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;