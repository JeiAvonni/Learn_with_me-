import * as _React from 'react'; 

interface Project {
    title: string
}


// This is our firsst functional based component!
export const Home = (project: Project) => {

    // return is always HTML & it can have ONLY 1 parent div 
    return (
        <div>
            <h1> { project.title }</h1>
        </div>
    )
}