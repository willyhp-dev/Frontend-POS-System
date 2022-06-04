import {
  SubSizeBar,
  SubBar,
  SubQuestBar,
  subBarAdmin,
} from "../SideBar/CustomHook";
export default function SidebarPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="text-white">
      <div className="p-2">
        <center>
          <h4>POS SYSTEM</h4>
        </center>
      </div>
      <div>
        {currentUser === null
          ? SubQuestBar.map((sub) => (
              <SubSizeBar icon={sub.icon} name={sub.name} link={sub.link} />
            ))
          : currentUser.user.role === "user"
          ? SubBar.map((sub) => (
              <SubSizeBar icon={sub.icon} name={sub.name} link={sub.link} />
            ))
          : subBarAdmin.map((sub) => (
              <SubSizeBar icon={sub.icon} name={sub.name} link={sub.link} />
            ))}
      </div>
 
    </div>
  );
}
