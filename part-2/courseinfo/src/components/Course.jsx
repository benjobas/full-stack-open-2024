const Course = ({ course })=> {
    return(
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

const Header = ({course}) => {
    return <h1>{course}</h1>;
}

const Content = ({parts}) => {
    return (
      <>
        {parts.map(part=> (
            <Part key={part.id} part={part} />
        ))}
      </>
    );
}

const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    );
}

const Total = ({parts}) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0);
    return <p><strong>Total of {total} exercises</strong></p>;
}
export default Course;