import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteUser, useUpdateUser } from "@/app/api/services/user/mutation";
import {
  UpdateUserFormValues,
  updateUserFormSchema,
} from "@/lib/zod/user-schema";
import { useRouter } from "next/navigation";

export default function FormUpdateUser({ userData, userId }: any) {
  const router = useRouter();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      full_name: userData?.full_name,
      username: userData?.username,
      email: userData?.email,
      address: userData?.address,
    },
  });

  const onSubmit = (values: UpdateUserFormValues) => {
    updateUserMutation.mutate({ ...values, id: userId });
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      router.push("/users");
    } catch (error: any) {
      console.log("error", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex">
          <div className="flex-1 mr-8">
            <div className="flex-1 border p-6 rounded-lg">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Invite your team members to collaborate.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${userData?.full_name}`}
                        />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="text-xl">
                        <p className="font-medium leading-none">
                          {userData?.username}
                        </p>
                        <p className="text-muted-foreground">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary" className="mt-4">
                    Delete user account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {userData && userData.id && (
                      <AlertDialogAction
                        onClick={() => handleDeleteUser(userData.id!)}
                      >
                        Continue
                      </AlertDialogAction>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="flex-1 border p-6 rounded-lg">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={userData?.full_name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={userData?.username}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={userData?.email}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={userData?.address}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-6 space-x-4 w-full">
              Update Profile Info
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
