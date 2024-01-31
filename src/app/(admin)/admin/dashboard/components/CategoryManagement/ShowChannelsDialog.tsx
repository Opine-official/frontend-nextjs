import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useEffect, useState } from "react";

type Props = {
  categoryId: string;
};

const ShowChannelsDialog = ({ categoryId }: Props) => {
  const [channels, setChannels] = useState([]);

  const getChannelsByCategoryId = async () => {
    try {
      const response = await axiosInstance.get(
        `https://opine/api/channel/channelsByCategory/?categoryId=${categoryId}`
      );
      console.log(response.data.channels);
      setChannels(response.data.channels);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getChannelsByCategoryId();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Channels</DialogTitle>
          <DialogDescription>
            <ul className="list-none space-y-2">
              {channels.map((channel: { channelId: string; name: string }) => (
                <li
                  key={channel.channelId}
                  className="p-2 text-gray-500  flex justify-between items-center"
                >
                  <span>{channel.name}</span>
                  <button
                    // onClick={() => removeChannel(channel.channelId)}
                    className="bg-red-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowChannelsDialog;