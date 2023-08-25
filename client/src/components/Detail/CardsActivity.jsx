
const CardsActivity = ({ activity }) => {
  return (
    <div className="cardActivity">
      <h2>{activity.name}</h2>
      <div className="cotainerColum">
        <div className="cotainerActivity">
          <p>Difficulty: </p>
          <p>Duration:</p>
          <p>Season: </p>
        </div>
        <div className="containerDataActivity">
          <p> {activity.difficulty}</p>
          <p> {activity.duration} hours</p>
          <p> {activity.season}</p>
        </div>
      </div>
    </div>
  );
};
export default CardsActivity;