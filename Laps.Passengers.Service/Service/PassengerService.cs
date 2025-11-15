using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale.Ami;
using Laps.Passengers.DataService;
using Laps.Passengers.Service.Interface;
using Utilities;

namespace Laps.Passengers.Service
{
    public class PassengerService : IPassengerRepository
    {
        private PassengerDataService _passengerDataService = new PassengerDataService();

        public string DeletePassenger(int id)
        {
            return _passengerDataService.DeletePassenger(id);
        }

        public List<Passenger> GetPassengerReport()
        {
            return _passengerDataService.GetPassengerReport();
        }

        public GridEntity<Passenger> PassengerGrid(GridOptions options)
        { var data= _passengerDataService.PassengerGrid(options);
            return data;
        }

        public List<TrainClass> PopulateClasssCombo()
        {
            var data = _passengerDataService.PopulateClasssCombo();
            return data;
        }

        public List<TrainRoutes> PopulateRoutesCombo()
        {
            var data = _passengerDataService.PopulateRoutesCombo();
            return data;
        }

        public List<Trains> PopulateTrainsCombo()
        {
            var data = _passengerDataService.PopulateTrainsCombo();
            return data;
        }

        public string SavePassenger(Passenger psngr)
        {
            return _passengerDataService.SavePassenger(psngr);
        }
    }
}
