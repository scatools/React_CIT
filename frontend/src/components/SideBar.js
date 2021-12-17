import React, {useState} from 'react';
import { Button } from 'react-bootstrap';

const SideBar = ({currentFilterConfig, onFilterConfigChange}) => {


    const [filterConfigInForm, setFilterConfigInForm] = useState({...currentFilterConfig});

	return (
		<nav id="sidebar">
			<div className="my-sidebar-header">
				<h3>Filter configuration:</h3>
			</div>
			<div className="my-sidebar-content">
				<div className="my-sidebar-component">
					<p>Related State:</p>
					<select className="form-control" value={filterConfigInForm.state} onChange={(event)=>{
                        setFilterConfigInForm({...filterConfigInForm, state: event.target.value})
                    }}>
						<option value="ALL">All scale</option>
						<option value="AL">Alabama</option>
						<option value="FL">Florida</option>
						<option value="LA">Louisiana</option>
						<option value="MS">Mississippi</option>
						<option value="TX">Texas</option>
						<option value="SE">Southeast Regional</option>
					</select>
				</div>
				<div className="my-sidebar-component">
					<p>Time frame:</p>
					<select className="form-control" value={filterConfigInForm.time} onChange={(event)=>{
                        setFilterConfigInForm({...filterConfigInForm, time: event.target.value})
                    }}>
						<option value="All">
							All Plans
						</option>
						<option value="5">Plan within 5 years</option>
						<option value="10">Plan within 10 years</option>
						<option value="10+">Plans longer than 10 years</option>
					</select>
				</div>
				<div className="my-sidebar-component" value={filterConfigInForm.priority} onChange={(event)=>{
                        setFilterConfigInForm({...filterConfigInForm, priority: event.target.value})
                    }}>
					<p>Priority:</p>
					<select className="form-control">
						<option value="All">
							All Conservations Plans
						</option>
						<option value="WQ">Water Quality Related Plans</option>
						<option value="Hab">Habitat Related Plans</option>
						<option value="LCMR">Resources/Species Related Plans</option>
						<option value="CR">Community Resilience Related Plans</option>
						<option value="ER">Ecosystem Resilience Related Plans</option>
						<option value="ECO">Gulf Economy Related Plans</option>
					</select>
				</div>
                <div className="my-sidebar-component">
                    <Button variant="secondary" onClick={()=>onFilterConfigChange(filterConfigInForm)}>Apply filter</Button>
                </div>
                
			</div>
		</nav>
	);
};

export default SideBar;
