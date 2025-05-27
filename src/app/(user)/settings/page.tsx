"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

export default function SettingsPage() {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	if (isPending) {
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<Spinner className="h-12 w-12" />
			</div>
		);
	}

	if (!session?.user) {
		router.push("/sign-in");
	}

	return (
		<div className="container max-w-2xl py-6">
			<h1 className="text-3xl font-bold mb-6">Settings</h1>
			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Appearance</CardTitle>
						<CardDescription>
							Customize how the application looks on your device
						</CardDescription>
					</CardHeader>
					<CardContent className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium">Theme</p>
							<p className="text-sm text-muted-foreground">
								Select the theme for the application
							</p>
						</div>
						<ThemeToggle />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
						<CardDescription>
							Configure how you receive notifications
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Email Notifications</Label>
								<p className="text-sm text-muted-foreground">
									Receive notifications about your account activity
								</p>
							</div>
							<Switch />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Push Notifications</Label>
								<p className="text-sm text-muted-foreground">
									Receive push notifications on your device
								</p>
							</div>
							<Switch />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Language & Region</CardTitle>
						<CardDescription>
							Set your preferred language and region
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>Language</Label>
							<Select defaultValue="en">
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select language" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="en">English</SelectItem>
									<SelectItem value="pl">Polski</SelectItem>
									<SelectItem value="de">Deutsch</SelectItem>
									<SelectItem value="fr">Français</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>Region</Label>
							<Select defaultValue="eu">
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select region" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="eu">Europe</SelectItem>
									<SelectItem value="na">North America</SelectItem>
									<SelectItem value="sa">South America</SelectItem>
									<SelectItem value="as">Asia</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Privacy</CardTitle>
						<CardDescription>Manage your privacy settings</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Profile Visibility</Label>
								<p className="text-sm text-muted-foreground">
									Make your profile visible to other users
								</p>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Activity Status</Label>
								<p className="text-sm text-muted-foreground">
									Show when you&apos;re active on the platform
								</p>
							</div>
							<Switch defaultChecked />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
