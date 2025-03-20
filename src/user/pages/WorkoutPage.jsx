import React from "react";
import '../components/workoutpage.css';

import bicep from '../../assets/bicep.jpg'
import tricep from '../../assets/tricep.png'
import pushup from '../../assets/pushupjpg.jpg'
import benchpress from '../../assets/benchpress.jpg'
import squat from '../../assets/squat.jpg'
import lungses from '../../assets/lungses.jpg'

function WorkoutPage() {
  return (
    <div className="workout-container">
      <h2 className="text-center">Workout Exercises</h2>

      {/* Hand Workouts */}
      <div className="workout-category">
        <h3 className="category-title">Hand Workouts</h3>
        <div className="workout-grid">
          <div className="workout-card">
            <img src={bicep} alt="Bicep Curls" className="workout-image" />
            <h4>Bicep Curls</h4>
            <p>Hold dumbbells and curl your arms upwards.</p>
          </div>

          <div className="workout-card">
            <img src={tricep} alt="Tricep Dips" className="workout-image" />
            <h4>Tricep Dips</h4>
            <p>Use parallel bars to lower and lift yourself.</p>
          </div>
        </div>
      </div>

      {/* Chest Workouts */}
      <div className="workout-category">
        <h3 className="category-title">Chest Workouts</h3>
        <div className="workout-grid">
          <div className="workout-card">
            <img src={pushup} alt="Push-Ups" className="workout-image" />
            <h4>Push-Ups</h4>
            <p>Keep your body straight and lower yourself to the ground.</p>
          </div>

          <div className="workout-card">
            <img src={benchpress} alt="Bench Press" className="workout-image" />
            <h4>Bench Press</h4>
            <p>Press the barbell upwards while lying on a bench.</p>
          </div>
        </div>
      </div>

      {/* Leg Workouts */}
      <div className="workout-category">
        <h3 className="category-title">Leg Workouts</h3>
        <div className="workout-grid">
          <div className="workout-card">
            <img src={squat} alt="Squats" className="workout-image" />
            <h4>Squats</h4>
            <p>Keep your back straight and lower your body by bending knees.</p>
          </div>

          <div className="workout-card">
            <img src={lungses} alt="Lunges" className="workout-image" />
            <h4>Lunges</h4>
            <p>Step forward and bend both knees at 90 degrees.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutPage;
