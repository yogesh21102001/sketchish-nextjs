import "./style.css";
import { TickSVG } from "../../assets/ossvg";

const tick = <TickSVG />;
const data = [
  { name: "1 million+ icons", tick: tick, tick1: tick, tick2: tick },
  { name: "PNG file format", tick: tick, tick1: tick, tick2: tick },
  { name: "SVG file format", tick: tick, tick1: tick, tick2: tick },
  { name: "Emojis Access", tick: tick, tick1: tick, tick2: tick },
  { name: "Use without attribution", tick: tick, tick1: tick, tick2: tick },
  { name: "Customise (stroke, color)", tick: "", tick1: tick, tick2: tick },
  { name: "Ad-Free", tick: "", tick1: tick, tick2: tick },
  { name: "Unlimited icon licenses", tick: "", tick1: "", tick2: tick },
];

export function PlanDetailsTable() {
  return (
    <div className="App">
      <table className="table-primary">
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={key} className="table-raw-con">
                <td>{val.name}</td>
                <td>{val.tick}</td>
                <td>{val.tick1}</td>
                <td>{val.tick2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
