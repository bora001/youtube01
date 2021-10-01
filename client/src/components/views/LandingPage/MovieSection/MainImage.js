import React from "react";

function MainImage(props) {
    return (
        <div>
            <div style={{
                width: '100%',
                height: '500px',
                background:`url('${props.image}')`, backgroundSize: '100% cover',
                position:'relative'
            }}>
                <div className="movie_info" style={{ position: 'absolute', color: '#fff' }}>
                    <h2 style={{ color: '#fff' }}>{props.title}</h2>
                    <p>{props.release}</p>
                    <p>{props.rate}</p>
                    <p>{props.desc}</p>
                </div>
            </div>
        </div>
    )
    
}

export default MainImage;