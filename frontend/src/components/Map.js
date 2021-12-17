import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Table as BootstrapTable, Button, CloseButton } from 'react-bootstrap';
import MapGL, { Source, Layer, Marker } from 'react-map-gl';
import { useHistory } from 'react-router-dom';
import CustomPagination from './CustomPagination';
import SideBar from './SideBar';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2h1Y2swNTIwIiwiYSI6ImNrMDk2NDFhNTA0bW0zbHVuZTk3dHQ1cGUifQ.dkjP73KdE6JMTiLcUoHvUA';

const geojson =
	'https://services1.arcgis.com/cYEfxjk21j8UlsTQ/ArcGIS/rest/services/SCA_Boundary/FeatureServer/0/query?where=1%3D1&f=pgeojson';
const layerStyle = {
	id: 'outline',
	type: 'line',
	paint: {
		'line-color': '#0080ff',
		'line-width': 1
	}
};

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const Map = () => {
	const [ viewport, setViewport ] = useState({
		latitude: 27.12,
		longitude: -88.222778,
		zoom: 5,
		bearing: 0,
		pitch: 0
	});

	const history = useHistory();

	// state to store map click event lat/lng info
	const [ coordinates, setCoordinates ] = useState([ undefined, undefined ]);
	const _onClickMap = useCallback(
		(evt) => {
			if (evt.lngLat) {
				setCoordinates(evt.lngLat);
			}
		},
		[ setCoordinates ]
	);

	// state to store query data
	const [ tableDetails, setTableDetails ] = useState();
	const [ totalCount, setTotalCount ] = useState(0);

	// state to store current page for pagination
	const [ currentPage, setCurrentPage ] = useState(1);

	// state to control filtering input
	const [ filterConfig, setFilterConfig ] = useState({
		state: 'All',
		time: 'All',
		priority: 'All'
	});

	const onFilterConfigChange = (newConfig) => {
		setFilterConfig(newConfig);
		setCurrentPage(1);
	};

	// state to control visibility of filter pane
	const [ showFilterPane, setShowFilterPane ] = useState(false);
	const toggleFilterPane = () => {
		setShowFilterPane((showFilterPane) => !showFilterPane);
	};

	const onPageChange = (newPage) => {
		setCurrentPage(newPage);
	};
	// state to control the visibility of the table component
	const [ showTableContainer, setShowTableContainer ] = useState(false);

	// useEffect for launching query and fetch data from backend
	useEffect(
		() => {
			const asyncFunc = async () => {
				if (coordinates[0] && coordinates[1]) {
					const response = await axios.get(`http://localhost:5000/data/spatial`, {
						params: {
							start: 10 * (currentPage - 1),
							end: 10 * currentPage,
							state: filterConfig.state,
							time: filterConfig.time,
							priority: filterConfig.priority,
							lng: coordinates[0],
							lat: coordinates[1]
						}
					});
					setTableDetails(response.data.data);
					setTotalCount(response.data.totalRowCount);
					if (response.data.totalRowCount !== 0) {
						setShowTableContainer(true);
					} else {
						setShowTableContainer(false);
					}
				}
			};
			asyncFunc();
		},
		[ currentPage, filterConfig, coordinates ]
	);

	return (
		<div className="wrapper">
			{showFilterPane && (
				<SideBar currentFilterConfig={filterConfig} onFilterConfigChange={onFilterConfigChange} />
			)}
			<div style={{ position: 'absolute', zIndex: 500, top: '10%', left: `${showFilterPane ? '25%' : '2%'}` }}>
				<Button variant="secondary" onClick={toggleFilterPane}>
					Filter
				</Button>
			</div>
			{showTableContainer && (
				<div id="map_table_contianer">
					<CloseButton onClick={() => setShowTableContainer(false)} />
					<BootstrapTable hover borderless striped>
						<thead>
							<tr style={{ borderBottom: '1px solid black' }}>
								<th>Plan Name</th>
								<th>Related State</th>
								<th>Plan Details</th>
							</tr>
						</thead>
						<tbody style={{ borderBottom: '1px solid black' }}>
							{!!tableDetails ? (
								tableDetails.map((row) => (
									<tr key={row.id}>
										<td style={{ width: '50%' }}>
											<div
												style={{
													overflow: 'hidden',
													height: 50,
													display: '-webkit-box',
													WebkitLineClamp: 2,
													WebkitBoxOrient: 'vertical'
												}}
												title={row.agency_lead}
											>
												{row.plan_name}
											</div>
										</td>
										<td>{row.related_state}</td>
										<td>
											<Button
												onClick={() => {
													history.push(`/plan/${row.id}`);
												}}
											>
												Learn more
											</Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="3">Loading table...</td>
								</tr>
							)}
						</tbody>
					</BootstrapTable>
					{!!tableDetails && (
						<CustomPagination
							totalCount={totalCount}
							onPageChange={onPageChange}
							currentPage={currentPage}
						/>
					)}
				</div>
			)}
			<MapGL
				{...viewport}
				width={'100%'}
				height={'100%'}
				onViewportChange={setViewport}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				onClick={_onClickMap}
			>
				<Source id="my-data" type="geojson" data={geojson}>
					<Layer {...layerStyle} />
				</Source>
				{coordinates[1] && coordinates[0] && <Marker longitude={coordinates[0]} latitude={coordinates[1]}>
					<svg
						height={20}
						viewBox="0 0 24 24"
						style={{
							cursor: 'pointer',
							fill: '#99c2eb',
							stroke: 'none',
							transform: `translate(${-20 / 2}px,${-20}px)`
						}}
					>
						<path d={ICON} />
					</svg>
				</Marker>}
			</MapGL>
		</div>
	);
};

export default Map;
