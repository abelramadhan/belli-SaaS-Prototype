import { Button } from "@/components/ui/button";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function FilterBar() {
  return (
    <div className="flex justify-between items-center mt-5">
      <div className="flex space-x-4">
        <Button variant={"outline"}>Filter</Button>
        <Button variant={"outline"}>
          <span className="mr-1 h-4 w-4">
            <ReloadIcon />
          </span>
          Refresh
        </Button>
        <Button variant={"outline"}>
          <span className="mr-1 h-4 w-4">
            <DownloadIcon />
          </span>
          Download
        </Button>
      </div>
      <Button variant={"secondary"}>Bulk Assign</Button>
    </div>
  );
}
