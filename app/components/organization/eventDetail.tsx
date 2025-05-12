import { useRouter } from "next/router";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;  // Extracts the 'id' from the URL

  // You can now use `id` to fetch data or render details
  return (
    <div>
      <h1>Event Details</h1>
      <p>Event ID: {id}</p> {/* Displays the event ID */}
      {/* Fetch and display event data based on `id` */}
    </div>
  );
};

export default EventDetail;
//***test the url whether it passes the id to the event detail successfully***
// and also ask about organization id bc we need to edit the api to show only the organization selected from the sidebar