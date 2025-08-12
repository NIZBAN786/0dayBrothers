import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  avatarUrl: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
  bio: z.string().max(500, 'Bio must be 500 characters or less').or(z.literal('')).optional(),
  location: z.string().max(100, 'Location must be 100 characters or less').or(z.literal('')).optional(),
  website: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
  socials: z
    .object({
      twitter: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
      github: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
      linkedin: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
    })
    .optional(),
});

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fallbackInitials = useMemo(() => {
    const first = user?.firstName?.[0] || '';
    const last = user?.lastName?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  }, [user]);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      avatarUrl: user?.avatarUrl || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      socials: {
        twitter: user?.socials?.twitter || '',
        github: user?.socials?.github || '',
        linkedin: user?.socials?.linkedin || '',
      },
    },
  });

  useEffect(() => {
    if (user && isOpen) {
      form.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        avatarUrl: user.avatarUrl || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        socials: {
          twitter: user.socials?.twitter || '',
          github: user.socials?.github || '',
          linkedin: user.socials?.linkedin || '',
        },
      });
    }
  }, [user, isOpen, form]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await updateProfile(data);
      onClose();
    } catch (err) {
      setSubmitError(err?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Your Profile</DialogTitle>
          <DialogDescription>View and edit your profile information</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-2">
          <Avatar className="h-14 w-14">
            <AvatarImage src={form.watch('avatarUrl') || user?.avatarUrl} alt={user?.username} />
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
            <div className="text-sm text-muted-foreground">@{user?.username}</div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Tell us about yourself..." {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://your-site.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="socials.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/your-handle" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socials.github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/your-username" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socials.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/your-id" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="glow-effect">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;

