"use client";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { IoArrowForward } from "react-icons/io5";
import { Loader2, Info, CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { useToast } from "../../components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useRouter } from "next/navigation";

interface Player {
  id: number;
  name: string;
  number: number;
  team_id: number;
  team: Team;
}
interface Team {
  id: number;
  name: string;
  players: Player[];
}

export default function Home({ params: { id } }: { params: { id: string } }) {
  const [player, setPlayer] = useState<Player>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("players");
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    fetch(`/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data);
        setIsLoading(false);

        // setDefaultValues({
        //   name: player?.name ?? "",
        //   number: player?.number ?? 0,
        //   team_id: player?.team_id.toString() ?? "",
        // });

        form.reset({
          name: data?.name ?? "",
          number: data?.number ?? 0,
          // team_id: data?.team_id.toString() ?? "",
        });
      });
    fetch(`/api/teams/`)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      });
  }, []);

  const formSchema = z.object({
    name: z.string().min(1, {
      message: t("errorName"),
    }),
    number: z.coerce.number().gte(0, t("errorNumber")),
    // team_id: z.string().min(1, {
    //   message: t("errorTeam"),
    // }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: 0,
      // team_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(JSON.stringify(values));
    console.log("id", id);
    try {
      const response = await fetch(`/api/players/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // const { status } = await response.json();
      const status = await response.json();
      router.push("/players");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-between px-3 py-24 sm:p-24">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      {isLoading ? (
        <FaSpinner className="m-5 animate-spin text-4xl" />
      ) : (
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hinata Shoyo"
                        defaultValue={player!.name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("number")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="10"
                        defaultValue={player!.number.toString()}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="team_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("team")}</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Equipe" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem
                              key={team.id}
                              value={team.id.toString()}
                              defaultChecked={team.id === player!.team_id}
                            >
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="text-center">
                {isLoading ? (
                  <Button disabled type="submit">
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t("submit")} <IoArrowForward />
                  </Button>
                ) : (
                  <Button type="submit">
                    {t("submit")} <IoArrowForward />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      )}
    </main>
  );
}
