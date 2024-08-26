function University({Data}){
    console.log(Data)
    return(
        <>
            <div className="row">
            { Data.map((item,index)=>
                (
                    <div  key={index} className="col-md-3 mt-3">
                    <div className="card">
                        <img src="https://placehold.co/200x200" className="card-img-top" alt="img" />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.country}</p>
                            <a href={item.web_pages[0]} className="btn btn-primary">link</a>
                        </div>
                    </div>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default University;