import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Comment } from 'src/v1/comments/comments.entity';

@Injectable()
export class CommentsEvents {
  @Inject(EventEmitter2)
  private readonly event: EventEmitter2;

  createNewCommentEvent(comment: Comment) {
    return this.event.emit('COMMENT_CREATE', comment);
  }
}
