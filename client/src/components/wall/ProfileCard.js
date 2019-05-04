import React from 'react'

const ProfileCard = (props) => {
    const { tweets, followers, following } = props;
    return(
        <div className="col-sm-3">
			<div className="panel panel-default">
				<div className="panel-body">
					<a href="#"><img className="img-responsive" alt="" src="http://placehold.it/800x500" /></a>
					<div className="row">
						<div className="col-xs-3">
							<h5>
								<small>TWEETS</small>
                                <br/>
								<a href="#">{tweets}</a>
							</h5>
						</div>
						<div className="col-xs-4">
							<h5>
								<small>FOLLOWING</small>
                                <br/>
								<a href="#">{following}</a>
							</h5>
						</div>
						<div className="col-xs-5">
							<h5>
								<small>FOLLOWERS</small>
                                <br/>
								<a href="#">{followers}</a>
							</h5>
						</div>
					</div>
				</div>
			</div>

			<div className="panel panel-default panel-custom">
				<div className="panel-heading">
					<h3 className="panel-title">
						Trends
					</h3>
				</div>

				{/* <div className="panel-body">
					<ul className="list-unstyled">
                        {trends.map((trend,i)=>(
                            <li key={i}><a href="#">#{trend}</a></li>
                        ))}
						
					</ul>
				</div> */}
			</div>
		</div>
    );
}

export default ProfileCard;