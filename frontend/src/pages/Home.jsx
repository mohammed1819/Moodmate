import { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import TaskList from '../components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="home">
      <h1>MoodMate</h1>
      <p>Your personal mood-based task recommender.</p>
      
      <MoodSelector setTasks={setTasks} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;