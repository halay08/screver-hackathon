import { useMutation, useQuery } from "react-query";
import SurveyTriangle from "./components/SurveyTriangle";
import "./App.css";
import {
  createSurveyResult,
  getSurveyResults,
} from "./api-services/survey-result";
import OutputHeatMap from "./components/OutputHeatMap";

function App() {
  const { data, isLoading, refetch } = useQuery(
    "getSurveyResults",
    () => getSurveyResults(),
    {
      select: (res) =>
        res.data?.data?.sort?.(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) || [],
    }
  );

  const createSurveyResultMutation = useMutation(createSurveyResult);

  const onSubmitSurvey = (point) => {
    createSurveyResultMutation.mutate(
      {
        coordinates: { x: point.x, y: point.y },
      },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  return (
    <div className="App">
      <div className="container mx-auto min-h-screen">
        <div className="mb-20">
          <h1 className="text-3xl font-bold mb-10">Survey</h1>
          <SurveyTriangle onSubmit={onSubmitSurvey} isLoading={createSurveyResultMutation.isLoading} />
        </div>
        <div className="mb-20">
          <h1 className="text-3xl font-bold mb-10">Output Heat Map</h1>
          <OutputHeatMap data={data} />
        </div>
        <div className="pb-20">
          <h1 className="text-3xl font-bold mb-10">DB Entries</h1>
          <div>
            {!isLoading &&
              data?.map((item) => (
                <p key={item.id} className="mb-2">
                  ID: {item.id}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
