import { UUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ExamService {
  getExams(groupId: UUID) {}
}
