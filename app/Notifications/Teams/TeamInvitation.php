<?php

declare(strict_types=1);

namespace App\Notifications\Teams;

use App\Models\TeamInvitation as TeamInvitationModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use UnexpectedValueException;

final class TeamInvitation extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public TeamInvitationModel $invitation)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $team = $this->invitation->team;
        $inviter = $this->invitation->inviter;

        throw_if(! $team || ! $inviter, UnexpectedValueException::class, 'Team and inviter are required for a team invitation notification.');

        return (new MailMessage)
            ->subject(__("You've been invited to join :teamName", ['teamName' => (string) $team->name]))
            ->line(__(':inviterName has invited you to join the :teamName team.', [
                'inviterName' => (string) $inviter->name,
                'teamName' => (string) $team->name,
            ]))
            ->action(__('Accept invitation'), url(sprintf('/invitations/%s/accept', $this->invitation->code)));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'invitation_id' => $this->invitation->id,
            'team_id' => $this->invitation->team_id,
            'team_name' => $this->invitation->team ? (string) $this->invitation->team->name : '',
            'role' => $this->invitation->role->value,
        ];
    }
}
