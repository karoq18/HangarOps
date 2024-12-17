import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useUser } from '../../context/UserContext';

const Dashboard = () => {
  const { user } = useUser();

  const [aircrafts, setAircrafts] = useState([]);
  const [aircraftCount, setAircraftCount] = useState(0);
  const [organizations, setOrganizations] = useState([]);
  const [organizationsCount, setOrganizationCount] = useState(0);
  const [pilots, setPilots] = useState([]);
  const [pilotCount, setPilotCount] = useState(0);
  const [mechanics, setMechanics] = useState([]);
  const [mechanicsCount, setMechanicsCount] = useState(0);
  const [activeMaintenancesCount, setActiveMaintenancesCount] = useState(0);
  const [completedMaintenancesCount, setCompletedMaintenancesCount] = useState(0);
  const [monthlyServices, setMonthlyServices] = useState(Array(12).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aircraftsResponse, organizationsResponse, usersResponse, maintenancesResponse] = await Promise.all([
          fetch('/get-aircrafts'),
          fetch('/get-organizations'),
          fetch('/get-users'),
          fetch('/get-maintenances'),
        ]);

        const aircraftsData = await aircraftsResponse.json();
        const organizationsData = await organizationsResponse.json();
        const usersData = await usersResponse.json();
        const maintenancesData = await maintenancesResponse.json();

        setAircrafts(aircraftsData);
        setAircraftCount(aircraftsData.length);

        setOrganizations(organizationsData);
        setOrganizationCount(organizationsData.length);

        const mechanics = usersData.filter(user => user.position === 'Mechanic');
        setMechanics(mechanics);
        setMechanicsCount(mechanics.length);

        const pilots = usersData.filter(user => user.position === 'Pilot');
        setPilots(pilots);
        setPilotCount(pilots.length);

        const activeMaintenances = maintenancesData.filter(maintenance => maintenance.status === 'Aktywna');
        setActiveMaintenancesCount(activeMaintenances.length);

        const completedMaintenances = maintenancesData.filter(maintenance => maintenance.status === 'Zakonczona');
        setCompletedMaintenancesCount(completedMaintenances.length);

        const monthlyCounts = maintenancesData.reduce((acc, maintenance) => {
          const month = new Date(maintenance.startDate).getMonth();
          acc[month] = (acc[month] || 0) + 1;
          return acc;
          }, Array(12).fill(0));
          setMonthlyServices(monthlyCounts);

      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData();
  }, []);

 const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
 "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  return (
    <Container fluid className="px-3" style={{ minHeight: "100vh" }}>
      <div className="text-center text-uppercase mb-5">{user && <h1>Witaj {user.username}!</h1>}</div>

      <div className="grey-bg container-fluid">
         <div className="row">
           <div className="col-xl-3 col-sm-6 col-12">
             <div className="card">
               <div className="card-content">
                 <div className="card-body">
                   <div className="media d-flex">
                     <div className="media-body text-left">
                       <h3 className="danger">{aircraftCount}</h3>
                       <span>Samoloty</span>
                     </div>
                     <div className="align-self-center">
                       <div className="icon-rocket danger font-large-2 float-right"></div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="col-xl-3 col-sm-6 col-12">
             <div className="card">
               <div className="card-content">
                 <div className="card-body">
                   <div className="media d-flex">
                     <div className="media-body text-left">
                       <h3 className="success">{organizationsCount}</h3>
                       <span>Organizacje</span>
                     </div>
                     <div className="align-self-center">
                       <div className="icon-organization success font-large-2 float-right"></div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="col-xl-3 col-sm-6 col-12">
             <div className="card">
               <div className="card-content">
                 <div className="card-body">
                   <div className="media d-flex">
                     <div className="media-body text-left">
                       <h3 className="warning">{pilotCount}</h3>
                       <span>Piloci</span>
                     </div>
                     <div className="align-self-center">
                       <div className="icon-pilot warning font-large-2 float-right"></div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="col-xl-3 col-sm-6 col-12">
             <div className="card">
               <div className="card-content">
                 <div className="card-body">
                   <div className="media d-flex">
                     <div className="media-body text-left">
                       <h3 className="primary">{mechanicsCount}</h3>
                       <span>Mechanicy</span>
                     </div>
                     <div className="align-self-center">
                       <div className="icon-mechanic primary font-large-2 float-right"></div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="row">
           <div className="col-xl-6 col-md-12">
             <div className="card overflow-hidden">
               <div className="card-content">
                 <div className="card-body cleartfix">
                   <div className="media align-items-stretch">
                     <div className="align-self-center">
                       <i className="icon-pencil primary font-large-2 mr-2"></i>
                     </div>
                     <div className="media-body">
                       <h4>Liczba aktualnych usług</h4>
                       <span>Wraz ze zgłoszonymi z datą późniejszą</span>
                     </div>
                     <div className="align-self-center">
                       <h1>{activeMaintenancesCount}</h1>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <div className="col-xl-6 col-md-12">
             <div className="card">
               <div className="card-content">
                 <div className="card-body cleartfix">
                   <div className="media align-items-stretch">
                     <div className="align-self-center">
                       <i className="icon-speech warning font-large-2 mr-2"></i>
                     </div>
                     <div className="media-body">
                       <h4>Liczba usług zakończonych</h4>
                       <span>W terminie</span>
                     </div>
                     <div className="align-self-center">
                       <h1>{completedMaintenancesCount}</h1>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

           <h3 className="text-uppercase mb-3 mt-3 text-center">Rozpoczęte usługi</h3>
                 <div className="row">
                   {monthlyServices.map((count, month) => (
                     <div className="col-2 text-center mb-4" key={month}>
                       <h6>{monthNames[month]}</h6>
                       <div className="progress" style={{ height: '30px' }}>
                         <div className="progress-bar" role="progressbar" style={{ width: `${count * 10}%` }} aria-valuenow={count} aria-valuemin="0" aria-valuemax="100">
                           {count}
                      </div>
                    </div>
                  </div>
                ))}
                 </div>
       </div>
 </Container>
   );
}

export default Dashboard;
