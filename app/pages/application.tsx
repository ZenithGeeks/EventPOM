import {Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"

const Application = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <SidebarProvider>

    </SidebarProvider>
  );
};

export default Application
