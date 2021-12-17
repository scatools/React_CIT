import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

const About = () => {
	return (
		<Container style={{ marginTop: 10 }}>
			<Jumbotron>
				<h1>Contact Us</h1>
				<p className="lead">Your input is really valuable to us. Please let us know!</p>
				<hr className="my-4" />
				<p className="lead">For more information, please contact our Project Coordinator</p>
				<p>
					<strong>Dr. Amanda Sesser</strong>
				</p>
				<p>Project Coordinator</p>
				<a href="mailto:scaprojectgulf@gmail.com" className="btn btn-success">
					Send an email
				</a>
				<hr className="my-4" />
				<p className="lead">Or one of our project's Principal Investigators:</p>
				<p>
					<strong>Dr. Kristine Evans</strong>
				</p>
				<p>Co-Director of the Quantitative Ecology and Spatial Technologies Lab (QuEST) Lab</p>
				<p>Department of Wildlife Fisheries and Aquaculture</p>
				<p>Mississippi State University</p>
				<a href="mailto:scaprojectgulf@gmail.com" className="btn btn-success">
					Send an email
				</a>
			</Jumbotron>
		</Container>
	);
};

export default About;
