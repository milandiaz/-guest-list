import { useState } from "react";
import useQuery from "./useQuery";

export default function App() {
  const [selectedGuestID, setSelectedGuestID] = useState(null);
  const { data: guests, loading, error } = useQuery("/guests");

  if (loading) return <p>Loading...</p>;
  if (error || !guests) return <p>{error?.message || "Error loading data."}</p>;

  const selectedGuest = guests.find((guest) => guest.id == selectedGuestID);

  return (
    <div>
      <h1>Guest List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id} onClick={() => setSelectedGuestID(guest.id)}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGuest && (
        <div className="selected">
          <h2>{selectedGuest.name}</h2>
          <p>
            <strong>Email:</strong> {selectedGuest.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedGuest.phone}
          </p>
          <p>
            <strong>Bio:</strong> {selectedGuest.bio}
          </p>
          <p>
            <strong>Job:</strong> {selectedGuest.job}
          </p>
          <button onClick={() => setSelectedGuestID(null)}>Back</button>
        </div>
      )}
    </div>
  );
}
